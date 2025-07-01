export const divRemove = (theDiv) => {
  const div = document.querySelector(theDiv);
  div.style.transition = "opacity 0.3s";
  div.style.opacity = "0";

  setTimeout(() => div.remove(), 300);
};
