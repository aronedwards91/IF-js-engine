import Setup from "./index";

declare global {
    interface Window {
        IFictionEngine: any;
    }
}

window.IFictionEngine = Setup;