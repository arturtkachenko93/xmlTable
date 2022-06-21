const table = document.querySelector('tbody');

const getJson = async () => {
  try {
    const resolve = await fetch('xmltojson.json');
    const json = await resolve.json();
    return json;
  } catch (err) {
    throw new Error(`Ошибка получения файла`)
  }
};


const objectToTable = async () => {
 const data = await getJson();

 data['rpc-reply'].configuration.security.zones['security-zone'].map(item => {
   if(Array.isArray(item['address-book']?.address)) {
     item['address-book']?.address.map(el => {
       el['ip-prefix'] ? table.insertAdjacentHTML('beforeEnd', `<td class="dest">${el['ip-prefix']}</td>`) : '';
          el.name ? table.insertAdjacentHTML('beforeEnd', `<th class="domain">${el.name}</th>`) : '';
       }
     )
   }
   item['address-book']?.address['ip-prefix'] ? table.insertAdjacentHTML('beforeEnd', `<td class="dest">${item['address-book']?.address['ip-prefix']}</td>`) : ''
    item['address-book']?.address?.name ? table.insertAdjacentHTML('beforeEnd', `<th class="domain">${item['address-book']?.address?.name}</th>`) : '';
  }
  )
  data['rpc-reply'].configuration.applications.application.map(item => {
    console.log(item)
    table.insertAdjacentHTML('beforeEnd', `<td class="description">${item.name}</td>`)
    table.insertAdjacentHTML('beforeEnd', `<td class="port">${item['destination-port']}</td>`)
    table.insertAdjacentHTML('beforeEnd', `<td class="description2">${item.protocol}</td>`)
  })
}

console.log(objectToTable())


// function jsonToTable(json) {
//   return JSON.parse(json).map(p =>
//     `<tr>${[p.lastname, p.middlename, p.firstname, p.birthday].map(el => `<td>${el}</td>`).join('')}</tr>`).join('');
// }

// console.log(table);
// yourTable.insertAdjacentHTML('beforeEnd', table);
