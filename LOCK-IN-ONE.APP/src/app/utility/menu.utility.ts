export function GenerateMenu(menus: any): string {
    let html = `<ul class="nav">`;

    menus.forEach((menu: any) => {
        html += `
      <li class="nav-item">
        <a class="nav-link" href="${menu.menu_route}">
          ${menu.menu_name}
        </a>
      </li>`;
    });

    html += `</ul>`;
    return html;
}