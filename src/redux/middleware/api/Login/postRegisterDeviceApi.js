import {API_URL} from '../../../../config/settings'
export async function post_Register_Device(info) {
  let dataPost = info;

  const response = await fetch(
    `${API_URL}api/Workstation/InsertWorkStationMOB`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataPost),
    },
  )
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
}
