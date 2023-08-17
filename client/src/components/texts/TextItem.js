import React, { useState } from "react";
import EditText from "./EditText";
import { useSelector } from "react-redux";
import { deleteTextData, getTextData } from "../../api/TextApi";

import { ListGroup, Badge, Button } from "react-bootstrap";

function TextItem({ itemIdx, itemId, itemText, textType, setTextData }) {
	const userId = useSelector((state) => state.userReducer.user_id);

	const [isEdit, setIsEdit] = useState(false);

	const onEditClick = () => {
		setIsEdit((prev) => !prev);
	};

	const onDeleteText = async (id) => {
		const isDelete = window.confirm("Are you sure to delete text?");
		if (isDelete) {
			try {
				await deleteTextData(id);
				await getTextData(userId, setTextData);
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
			variant={textType === "all" ? "secondary" : "success"}
			action
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
					<h5 className="m-0">
						<Badge
							bg={textType === "all" ? "light" : "secondary"}
							text={textType === "all" ? "dark" : "light"}
						>
							{itemIdx + 1}
						</Badge>
					</h5>
					<div className="ms-2 me-auto">
						<div className="fw-bold">{itemText}</div>
					</div>
					{textType === "all" && (
						<>
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
				</>
			)}
		</ListGroup.Item>
	);
}

export default TextItem;
