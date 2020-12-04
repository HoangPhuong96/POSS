import {userData, API_URL, userOutLet} from '../../../../config/settings';

export async function postFillCodeApi(infoData) {
  const body = infoData;
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const response = await fetch(
    `https://ihotel.fis.vn/iHOTELREGapi/api/Register/getregisterhotel`,

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
