import { userData, API_URL, userOutLet } from '../../../../config/settings';

export async function getTableAPI() {
    const TOKEN = userData.TOKEN;
    // console.log(TOKEN);

    const body = {
        PROPERTY_CODE: userData.PROPERTY_CODE,
        OUTLET_ID: userData.OUTLET_ID
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
        'Authorization', `${TOKEN}`
    );

    const response = await fetch(
        `${API_URL}api/Table/getDataPosPlan/`,

        {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(body),
        },
    )
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