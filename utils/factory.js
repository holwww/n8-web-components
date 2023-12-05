
// create any html element by it's name
function el({ name, html = "", textContent = "" }) {
  const element = document.createElement(name)

  if (html !== "") {
    element.innerHTML = html;
  }

  if (textContent !== "") {
    element.textContent = textContent
  }

  return element
}


function template(html) {
  return el({ name: "template", html: html })
}

function style(css) {
  return el({ name: "style", textContent: css })
}

export default {
  el,
  style,
  template,
}
