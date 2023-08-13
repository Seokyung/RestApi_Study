import React from "react";
import { ListGroup, Button } from "react-bootstrap";

function TextItem({ itemId, itemText }) {
	return (
		<ListGroup.Item
			key={itemId}
			as="li"
			variant="secondary"
			className="d-flex justify-content-between align-items-start"
		>
			<div className="ms-2 me-auto">
				<div className="fw-bold">{itemText}</div>
			</div>
			<Button variant="secondary" size="sm">
				Edit
			</Button>
			<Button variant="danger" size="sm" className="ms-2">
				Delete
			</Button>
		</ListGroup.Item>
	);
}

export default TextItem;
