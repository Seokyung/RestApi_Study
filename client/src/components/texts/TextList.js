import React from "react";
import TextItem from "./TextItem";
import { ListGroup } from "react-bootstrap";

function TextList({ textData, setTextData, textType }) {
	return (
		<ListGroup as="ol">
			{textData.map((data, idx) => (
				<TextItem
					key={idx}
					itemIdx={idx}
					itemId={data.text_id}
					itemText={data.text_data}
					textType={textType}
					setTextData={setTextData}
				/>
			))}
		</ListGroup>
	);
}

export default TextList;
