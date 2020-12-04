import { userData, API_URL, userOutLet } from '../../../../config/settings';

export async function getFindTransaction() {
    const TOKEN = userData.TOKEN;


    const body = {
        PROPERTY_CODE: userData.PROPERTY_CODE,
        CHECK_OPEN: userData.CASHIER_DATE,
        EMPLOYEE_CODE: userData.CASHIER_ID,
        OUTLET_ID: userData.OUTLET_ID,
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
        'Authorization', `${TOKEN}`
    );

    const response = await fetch(
        `${API_URL}api/Check/getFindTransaction/`,

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