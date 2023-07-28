import React, { useState } from "react";

const EditForm = ({ author, main_character, seasons, handleSubmit,title }) => {
	const [newAuthor, setNewAuthor] = useState(author);
	const [newMainCharacter, setNewMainCharacter] = useState(main_character);
	const [newSeasons, setNewSeasons] = useState(seasons);
	const [newTitle, setNewTitle] = useState(title);

	const handleFormSubmit = e => {
		e.preventDefault();
		handleSubmit({
			author: newAuthor,
			main_character: newMainCharacter,
			seasons: newSeasons,
			title:newTitle
		});
	};

	return (
		<form onSubmit={handleFormSubmit}>
			<div className='mb-5 font-normal h-3/5 text-gray-700 dark:text-gray-400'>
				Title:{" "}
				<input
					type='text'
					value={newTitle}
					onChange={e => setNewTitle(e.target.value)}
				/>
			</div>
			<div className='mb-5 font-normal h-3/5 text-gray-700 dark:text-gray-400'>
				Author:{" "}
				<input
					type='text'
					value={newAuthor}
					onChange={e => setNewAuthor(e.target.value)}
				/>
			</div>
			<div className='mb-5 font-normal h-3/5 text-gray-700 dark:text-gray-400'>
				Main Character:{" "}
				<input
					type='text'
					value={newMainCharacter}
					onChange={e => setNewMainCharacter(e.target.value)}
				/>
			</div>
			<div className='mb-5 font-normal h-3/5 text-gray-700 dark:text-gray-400'>
				Seasons:{" "}
				<input
					type='number'
					value={newSeasons}
					onChange={e => setNewSeasons(e.target.value)}
				/>
			</div>
			<button
				type='submit'
				className='inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
			>
				UPDATE
			</button>
		</form>
	);
};

export default EditForm;
