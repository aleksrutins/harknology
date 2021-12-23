use yew::{Component, Context, html, Html, Properties};

pub enum Msg {
    
}

#[derive(PartialEq, Properties)]
pub struct ClassPreviewProps {
    pub class: crate::class::Class
}

pub struct ClassPreview;

impl Component for ClassPreview {
    type Message = Msg;
    type Properties = ClassPreviewProps;

    fn create(_ctx: &Context<Self>) -> Self {
        Self
    }

    fn view(&self, ctx: &Context<Self>) -> Html {
        html! {
            <div>
                <h2>{ &ctx.props().class.name }</h2>
                <p>{&ctx.props().class.description}</p>
            </div>
        }
    }
}