import {userData, API_URL,} from '../../../../config/settings';

export async function send_Remind_Api(data) {
  const TOKEN = userData.TOKEN;
  // console.log(TOKEN);

  const body = data;

  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `${TOKEN}`);

  const response = await fetch(`${API_URL}api/CheckItemPrint/printSendRemind/`, {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((result) => {
      // console.log('ApiNew:', result);
      return result;
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
}
