import styled from "styled-components";
import json from "../../config/colors.json";

const ListNotes = styled.aside`
    overflow-y: scroll;
    max-height: calc(100vh - 187px);
    max-width: 500px;

    ::-webkit-scrollbar {
	width: 10px;
	height: 10px;
}

::-webkit-scrollbar-button:start:decrement,
::-webkit-scrollbar-button:end:increment  {
	display: none;
}

::-webkit-scrollbar-thumb:vertical {
	background-color: ${json.secondary};
	-webkit-border-radius: 6px;
}
`

export default ListNotes;