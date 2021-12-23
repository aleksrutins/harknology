mod class;
mod class_preview;

use yew::prelude::*;

use crate::class::Class;
use crate::class_preview::ClassPreview;

enum Msg {
    AddOne,
}

struct Model {
    value: i64,
}

impl Component for Model {
    type Message = Msg;
    type Properties = ();

    fn create(_ctx: &Context<Self>) -> Self {
        Self {
            value: 0,
        }
    }

    fn update(&mut self, _ctx: &Context<Self>, msg: Self::Message) -> bool {
        match msg {
            Msg::AddOne => {
                self.value += 1;
                // the value has changed so we need to
                // re-render for it to appear on the page
                true
            }
        }
    }

    fn view(&self, ctx: &Context<Self>) -> Html {
        // This gives us a component's "`Scope`" which allows us to send messages, etc to the component.
        let link = ctx.link();
        let class = Class {
            name: "Hello".to_string(),
            teacher: "That Guy".to_string(),
            description: "Hello world".to_string()
        };
        html! {
            <div>
                <button onclick={link.callback(|_| Msg::AddOne)}>{ "+1" }</button>
                <p>{ self.value }</p>
                <ClassPreview {class} />
            </div>
        }
    }
}

fn main() {
    yew::start_app::<Model>();
}