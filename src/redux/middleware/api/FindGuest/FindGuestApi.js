import { userData, API_URL, userOutLet } from '../../../../config/settings';

export async function getFindGuest() {
    const TOKEN = userData.TOKEN;


    const body = {
        PROPERTY_CODE: userData.PROPERTY_CODE,
        SEARCH_TYPE5: true,
        SEARCH_TYPE9: true
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
        'Authorization', `${TOKEN}`
    );

    const response = await fetch(
        `${API_URL}api/GuestCheck/getInhousePostIt/`,

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
            console.log(error);
        });
    return response;

}