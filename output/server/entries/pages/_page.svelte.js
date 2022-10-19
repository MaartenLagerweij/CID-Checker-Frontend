import { c as create_ssr_component, e as escape, d as each } from "../../chunks/index.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "main.svelte-1xhf3vc{text-align:center;padding:1em;max-width:240px;margin:0 auto}h1.svelte-1xhf3vc{color:#ff3e00;text-transform:uppercase;font-size:4em;font-weight:100}@media(min-width: 640px){main.svelte-1xhf3vc{max-width:none}}button.svelte-1xhf3vc{background-color:#202142;color:#fff;border:0;border-radius:8px;color:#fff;width:100px;height:40px;cursor:pointer}button.svelte-1xhf3vc:hover{transform:scale(0.98);opacity:0.9}table.svelte-1xhf3vc{font-family:arial, sans-serif;border-collapse:collapse;width:100%}td.svelte-1xhf3vc{border:1px solid #dddddd;text-align:left;padding:8px}.alert-message.svelte-1xhf3vc{width:250px;margin:auto;text-decoration:underline;border:1px solid red;color:red}#output.svelte-1xhf3vc{max-width:1100px;margin:auto}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let submitFeedback = "";
  let rows = [];
  $$result.css.add(css);
  return `<main class="${"svelte-1xhf3vc"}"><h1 class="${"svelte-1xhf3vc"}">CID Checker</h1>
	<form><textarea rows="${"15"}" cols="${"80"}" type="${"text"}" id="${"input"}">${""}</textarea>
		<button type="${"submit"}" class="${"svelte-1xhf3vc"}">Get CID&#39;s </button></form>

	<p class="${["svelte-1xhf3vc", ""].join(" ").trim()}">${escape(submitFeedback)}</p>
	<div id="${"output"}" class="${"svelte-1xhf3vc"}">${rows.length > 0 ? `<table class="${"svelte-1xhf3vc"}">${each(rows, ({ url, salesForceSyntaxURL }) => {
    return `<tr><td class="${"svelte-1xhf3vc"}">${escape(url)}</td>
						<td class="${"svelte-1xhf3vc"}">${escape(salesForceSyntaxURL)}</td>
					</tr>`;
  })}</table>` : ``}</div>
</main>`;
});
export {
  Page as default
};
