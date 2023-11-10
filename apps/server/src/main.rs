use std::{borrow::Cow, env, error::Error, sync::Arc};

use async_graphql::{EmptyMutation, EmptySubscription, Schema};
use async_graphql_axum::GraphQL;
use axum::{routing::get, Router, Server};
use clerk_rs::{clerk::Clerk, ClerkConfiguration};

use crate::{
    graphql::{graphiql, graphql_handler},
    prisma::PrismaClient,
};

mod graphql;
#[allow(warnings, unused)]
mod prisma;

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    // Prisma initialization
    let prisma_client = PrismaClient::_builder().build().await?;

    // Clerk initialization
    let clerk_config =
        ClerkConfiguration::new(None, None, Some(env::var("CLERK_SECRET_KEY")?), None);

    let schema = Schema::build(graphql::Query, EmptyMutation, EmptySubscription)
        .data(prisma_client)
        .data(Arc::new(Clerk::new(clerk_config.clone())))
        .finish();

    let app = Router::new()
        .route("/", get(graphiql).post(graphql_handler))
        .with_state((schema, Arc::new(Clerk::new(clerk_config))));

    let port = env::var("PORT").unwrap_or_else(|_| "8000".to_string());

    println!("GraphiQL: http://localhost:{}", port);
    Server::bind(&format!("0.0.0.0:{}", port).parse()?)
        .serve(app.into_make_service())
        .await?;
    Ok(())
}
