import {userData, API_URL, userOutLet} from '../../../../config/settings';

export async function getLocation() {
  const TOKEN = userData.TOKEN;

  const body = {
    PROPERTY_CODE: userData.PROPERTY_CODE,
    OUTLET_ID: userData.OUTLET_ID,
  };

  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `${TOKEN}`);

  const response = await fetch(
    `${API_URL}api/Location/loadDataPosPlan/`,

    {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(body),
    },
  )
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return {mess: 'No Internet', isInternet: false};
    });
  return response;
}
