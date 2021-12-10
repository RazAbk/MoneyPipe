import { store } from 'react-notifications-component';

export interface IAlertMessage{
    message: string;
    type: "success" | "danger" | "info" | "default" | "warning" | undefined;
    duration: number;
    title: string;
}

export function alertMessage(message: string, type: IAlertMessage["type"], duration: number = 3500) {
    return store.addNotification({
        message,
        type,
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__backInRight"],
        animationOut: ["animate__animated", "animate__backOutRight"],
        dismiss: {
            duration,
            onScreen: true
        }
    });
}

export function alertTitleMessage(title: string, message: string, type: IAlertMessage["type"], duration: number = 3500) {
    return store.addNotification({
        title,
        message,
        type,
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__backInRight"],
        animationOut: ["animate__animated", "animate__backOutRight"],
        dismiss: {
            duration,
            onScreen: true
        }
    });
}



export function removeMessage(messageId: string) {
    store.removeNotification(messageId)
}