use std::sync::Arc;

use async_graphql::{
    context, http::GraphiQLSource, Context, EmptyMutation, EmptySubscription, Object, Result,
    Schema,
};
use async_graphql_axum::{GraphQLRequest, GraphQLResponse};
use axum::{
    extract::State,
    http::{HeaderMap, StatusCode},
    response::{self, IntoResponse},
};
use clerk_rs::{
    apis::{clients_api::ClientApis, sessions_api::Session, users_api::User},
    clerk::Clerk,
    ClerkModels::VerifyClientRequest,
};

pub struct Query;

pub type HarknologySchema = Schema<Query, EmptyMutation, EmptySubscription>;

#[Object]
impl Query {
    async fn howdy<'ctx>(&self, ctx: &Context<'ctx>) -> Result<&'static str> {
        let clerk = ctx.data::<Clerk>()?;
        Ok("partner")
    }
}

pub async fn graphiql() -> impl IntoResponse {
    response::Html(GraphiQLSource::build().finish())
}

pub async fn graphql_handler(
    State((schema, clerk)): State<(HarknologySchema, Arc<Clerk>)>,
    headers: HeaderMap,
    req: GraphQLRequest,
) -> Result<GraphQLResponse, StatusCode> {
    let mut req = req.into_inner();
    if let Some(token) = headers.get("authorization") {
        let client = ClientApis::verify_client(
            &clerk,
            Some(VerifyClientRequest {
                token: Some(String::from(
                    token
                        .to_str()
                        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?,
                )),
            }),
        )
        .await
        .map_err(|_| StatusCode::UNAUTHORIZED)?;

        let session = Session::get_session(
            &clerk,
            client
                .last_active_session_id
                .ok_or(StatusCode::UNAUTHORIZED)?
                .as_str(),
        )
        .await
        .map_err(|_| StatusCode::UNAUTHORIZED)?;

        let user = User::get_user(&clerk, session.user_id.as_str())
            .await
            .map_err(|_| StatusCode::UNAUTHORIZED)?;

        req = req.data(session).data(user);
    }
    Ok(schema.execute(req).await.into())
}
