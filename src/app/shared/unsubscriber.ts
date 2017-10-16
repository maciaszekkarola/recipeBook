export default function unsubscriber(subscriptions) {
    subscriptions.forEach(sub => {
        sub.unsubscribe();
    });
}
