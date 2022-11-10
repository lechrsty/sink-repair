import { getRequests, deleteRequest, getPlumbers, saveCompletion } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

export const Requests = () => {
    const requests = getRequests()

    let html = `
            <ul>
                ${requests.map(convertRequestToListElement).join("")
        }
            </ul>
        `

    return html
}

const convertRequestToListElement = (requestObject) => {

    const plumbers = getPlumbers()

    return `
    <li>
        ${requestObject.description}
        <button class="request__delete"
                id="request--${requestObject.id}">
            Delete
        </button>
    </li>

    <select class="plumbers" id="plumbers">
    <option value="">Choose</option>
    ${
        plumbers.map(
            plumber => {
                return `<option value="${requestObject.id}--${plumber.id}">${plumber.name}</option>`
            }
        ).join("")
    }
</select>
`
}

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

            const completion = {
                requestId: (parseInt(requestId)),
                plumberId: (parseInt(plumberId)),
                date_created: new Date().toDateString()
             }

            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
            saveCompletion(completion)
        }
    }
)



























