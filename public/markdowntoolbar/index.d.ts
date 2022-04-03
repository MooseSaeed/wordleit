declare global {
    interface Window {
        MarkdownToolbarElement: typeof MarkdownToolbarElement;
        MarkdownHeaderButtonElement: typeof MarkdownHeaderButtonElement;
        MarkdownBoldButtonElement: typeof MarkdownBoldButtonElement;
        MarkdownItalicButtonElement: typeof MarkdownItalicButtonElement;
        MarkdownQuoteButtonElement: typeof MarkdownQuoteButtonElement;
        MarkdownCodeButtonElement: typeof MarkdownCodeButtonElement;
        MarkdownLinkButtonElement: typeof MarkdownLinkButtonElement;
        MarkdownImageButtonElement: typeof MarkdownImageButtonElement;
        MarkdownUnorderedListButtonElement: typeof MarkdownUnorderedListButtonElement;
        MarkdownOrderedListButtonElement: typeof MarkdownOrderedListButtonElement;
        MarkdownTaskListButtonElement: typeof MarkdownTaskListButtonElement;
        MarkdownMentionButtonElement: typeof MarkdownMentionButtonElement;
        MarkdownRefButtonElement: typeof MarkdownRefButtonElement;
        MarkdownStrikethroughButtonElement: typeof MarkdownStrikethroughButtonElement;
        MarkdownTableButtonElement: typeof MarkdownTableButtonElement;
        MarkdownUnderlineButtonElement: typeof MarkdownUnderlineButtonElement;
        MarkdownNextLineButtonElement: typeof MarkdownNextLineButtonElement;
        MarkdownAddSpaceButtonElement: typeof MarkdownAddSpaceButtonElement;
    }
    interface HTMLElementTagNameMap {
        "markdown-toolbar": MarkdownToolbarElement;
        "md-header": MarkdownHeaderButtonElement;
        "md-bold": MarkdownBoldButtonElement;
        "md-italic": MarkdownItalicButtonElement;
        "md-quote": MarkdownQuoteButtonElement;
        "md-code": MarkdownCodeButtonElement;
        "md-link": MarkdownLinkButtonElement;
        "md-image": MarkdownImageButtonElement;
        "md-unordered-list": MarkdownUnorderedListButtonElement;
        "md-ordered-list": MarkdownOrderedListButtonElement;
        "md-task-list": MarkdownTaskListButtonElement;
        "md-mention": MarkdownMentionButtonElement;
        "md-ref": MarkdownRefButtonElement;
        "md-strikethrough": MarkdownStrikethroughButtonElement;
        "md-table": MarkdownTableButtonElement;
        "md-underline": MarkdownUnderlineButtonElement;
        "md-linedivider": MarkdownLinedividerButtonElement;
        "md-next-line": MarkdownNextLineButtonElement;
        "md-add-space": MarkdownAddSpaceButtonElement;
    }
}
declare class MarkdownButtonElement extends HTMLElement {
    constructor();
    connectedCallback(): void;
    click(): void;
}
declare class MarkdownAddSpaceButtonElement extends MarkdownButtonElement {
    constructor();
}
declare class MarkdownHeaderButtonElement extends MarkdownButtonElement {
    constructor();
}
declare class MarkdownTableButtonElement extends MarkdownButtonElement {
    constructor();
}
declare class MarkdownUnderlineButtonElement extends MarkdownButtonElement {
    constructor();
}
declare class MarkdownLinedividerButtonElement extends MarkdownButtonElement {
    constructor();
}
declare class MarkdownBoldButtonElement extends MarkdownButtonElement {
    constructor();
}
declare class MarkdownItalicButtonElement extends MarkdownButtonElement {
    constructor();
}
declare class MarkdownQuoteButtonElement extends MarkdownButtonElement {
    constructor();
}
declare class MarkdownCodeButtonElement extends MarkdownButtonElement {
    constructor();
}
declare class MarkdownLinkButtonElement extends MarkdownButtonElement {
    constructor();
}
declare class MarkdownImageButtonElement extends MarkdownButtonElement {
    constructor();
}
declare class MarkdownUnorderedListButtonElement extends MarkdownButtonElement {
    constructor();
}
declare class MarkdownOrderedListButtonElement extends MarkdownButtonElement {
    constructor();
}
declare class MarkdownTaskListButtonElement extends MarkdownButtonElement {
    constructor();
}
declare class MarkdownMentionButtonElement extends MarkdownButtonElement {
    constructor();
}
declare class MarkdownRefButtonElement extends MarkdownButtonElement {
    constructor();
}
declare class MarkdownStrikethroughButtonElement extends MarkdownButtonElement {
    constructor();
}
declare class MarkdownNextLineButtonElement extends MarkdownButtonElement {
    constructor();
}
declare class MarkdownToolbarElement extends HTMLElement {
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    get field(): HTMLTextAreaElement | null;
}
export default MarkdownToolbarElement;
