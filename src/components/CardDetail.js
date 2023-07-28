import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Toggle from "./Toggle";
import EditForm from "./EditForm";
import { updateCollection, deleteCollection } from "../helper/utils";
import ModalConfirm from "./ModalConfirm";

const CardDetail = ({
	title,
	synopsis,
	url,
	genre,
	id,
	author,
	main_character,
	seasons
}) => {
	const [editMode, setEditMode] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const navigate = useNavigate();

	const handleEditMode = value => {
		setEditMode(value);
	};

	const handleFormSubmit = async formData => {
		// Handle form submission and update the details here
		console.log("Form submitted with data:", formData);
		await updateCollection(id, formData);
		setEditMode(false);
		navigate("/");
	};

	const handleDelete = async () => {
		// Open the modal for confirmation
		setModalVisible(true);
	};

	const handleModalConfirm = async () => {
		// Handle delete confirmation and close the modal
		await deleteCollection(id);
		navigate("/");
	};

	const handleModalCancel = () => {
		// Close the modal without deleting
		setModalVisible(false);
	};

	return (
		<div className='w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
			{modalVisible && (
				<ModalConfirm onConfirm={handleModalConfirm} onCancel={handleModalCancel} />
			)}
			<h5 className='text-center mb-5 mt-5 text-8xl font-bold tracking-tight text-gray-900 dark:text-white'>
				{title}
			</h5>
			<Link to='#'>
				<img
					className='object-contain rounded-t-lg w-full h-2/5'
					src={url}
					alt='thumbnail'
				/>
			</Link>
			<div className='p-5'>
				{editMode ? (
					// Render the EditForm when edit mode is active
					<EditForm
						author={author}
						main_character={main_character}
						seasons={seasons}
                        title={title}
						handleSubmit={handleFormSubmit}
					/>
				) : (
					// Render the text when edit mode is not active
					<>
						<p className='text-center text-xl mb-5 font-bold italic text-gray-900 dark:text-gray-300'>
							{synopsis}
						</p>
						<p className='text-center text-xl mb-5 font-bold italic text-gray-900 dark:text-gray-300'>
							{genre}
						</p>
						<p className='mb-5 font-normal h-3/5 text-gray-700 dark:text-gray-400'>
							Author: {author}
						</p>
						<p className='mb-5 font-normal h-3/5 text-gray-700 dark:text-gray-400'>
							Main Character: {main_character}
						</p>
						<p className='mb-5 font-normal h-3/5 text-gray-700 dark:text-gray-400'>
							Seasons: {seasons}
						</p>
					</>
				)}
				{editMode && (
					<button
						onClick={handleDelete}
						className='inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
					>
						DELETE
					</button>
				)}
			</div>
			<Toggle setEditMode={handleEditMode} />
			<button
				onClick={() => {
					navigate("/");
				}}
				className='inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
			>
				BACK
			</button>
		</div>
	);
};

export default CardDetail;
