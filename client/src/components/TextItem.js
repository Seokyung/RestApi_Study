import React, { useState } from "react";
import EditText from "./EditText";

import { ListGroup, Badge, Button } from "react-bootstrap";
import { deleteTextData, getTextData } from "../api/TextApi";

function TextItem({ itemIdx, itemId, itemText, setTextData }) {
	const [isEdit, setIsEdit] = useState(false);

	const onEditClick = () => {
		setIsEdit((prev) => !prev);
	};

	const onDeleteText = async (id) => {
		const isDelete = window.confirm("Are you sure to delete text?");
		if (isDelete) {
			try {
				await deleteTextData(id);
				await getTextData(setTextData);
				alert("text deleted!");
			} catch (err) {
				console.log(err);
			}
		} else {
			return;
		}
	};

	return (
		<ListGroup.Item
			as="li"
			variant="secondary"
			className="d-flex justify-content-between align-items-center"
		>
			{isEdit ? (
				<EditText
					itemId={itemId}
					itemText={itemText}
					setTextData={setTextData}
					onEditClick={onEditClick}
				/>
			) : (
				<>
					<h5 style={{ margin: "0" }}>
						<Badge bg="light" text="dark">
							{itemIdx + 1}
						</Badge>
					</h5>
					<div className="ms-2 me-auto">
						<div className="fw-bold">{itemText}</div>
					</div>
					<Button variant="secondary" size="sm" onClick={onEditClick}>
						Edit
					</Button>
					<Button
						variant="danger"
						size="sm"
						className="ms-2"
						onClick={() => onDeleteText(itemId)}
					>
						Delete
					</Button>
				</>
			)}
		</ListGroup.Item>
	);
}

export default TextItem;
