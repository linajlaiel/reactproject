import React, { useState, useEffect } from "react";
import { fetchCollections } from "../helper/utils";
import SearchBar from "../components/SearchBar";
import Card from "../components/Card";

const Home = () => {
	const [animes, setAnimes] = useState([]);
	const [genreInput, setGenreInput] = useState(null);


	const handleGenreChange = genre => {
		setGenreInput(genre);
	};

	const fetchData = async () => {
		const res = await fetchCollections("animes");
		setAnimes(res);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const filteredAnimes = animes.filter(anime => {
		const genreToSearch = genreInput ? genreInput.toLowerCase() : ""; // Set default value to an empty string if genreInput is null
		return anime.genre.toLowerCase().includes(genreToSearch);
	});

	const removeFilter = () => {
		setGenreInput(null);
	};

	return (
		<>
			<header className='mt-5 mb-5'>
				<h1 className='text-center text-3xl font-bold underline'>
					Animes Discover!
				</h1>
				<h2 className='text-center text-2xl font-bold underline'>アニメの発見!</h2>
				<SearchBar onGenreChange={handleGenreChange} />
			</header>
			{genreInput && (
				<div className='text-center mb-4'>
					<h1 className='text-xl font-bold'>Filter is applied: {genreInput}</h1>
					<button
						onClick={removeFilter}
						className='text-blue-500 hover:underline focus:outline-none'
					>
						Remove filter
					</button>
				</div>
			)}
			<main className='ml-2 flex justify-around content-center flex-wrap'>
				{/* Render the filtered animes instead of all animes */}
				{filteredAnimes.map(anime => {
					return (
						<Card
                            slug={anime.slug}
							author={anime.author}
							genre={anime.genre}
							main_character={anime.main_character}
							seasons={anime.seasons}
							synopsis={anime.synopsis}
							title={anime.title}
							url={anime.thumbnail}
							key={anime.id}
						/>
					);
				})}
			</main>
		</>
	);
};

export default Home;
