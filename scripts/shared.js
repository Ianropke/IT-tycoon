// scripts/shared.js

/** Show Toast Notification **/
export function showToast(message) {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return; // Prevent errors if toast-container is missing

    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.textContent = message;
    toastContainer.appendChild(toast);

    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.remove();
    }, 3000);
}
