import { useState, useEffect } from "react";

export default function useUiLayout() {
    const [uiLayout, setUiLayout] = useState('horizontal');
    useEffect(() => {
        new ResizeObserver(() => {
            setUiLayout(getComputedStyle(document.body).getPropertyValue('--ui-layout').trim());
        }).observe(document.body);
    }, []);
    return uiLayout;
}