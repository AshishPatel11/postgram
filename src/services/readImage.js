export const readImage = (image) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = reject;
    reader.readAsDataURL(image);
});

// export const parseImage = (imageString) => new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = (event) => resolve(event.target.result);
//     reader.onerror = reject;
//     reader.readAsText(imageString);
// });

export function parseImage(buffer) {
    let base64 = btoa(buffer);
    return base64;
}