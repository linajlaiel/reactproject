import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchCollection } from "../helper/utils.js";
import CardDetail from "../components/CardDetail.js";

const Detail = () => {
	const { slug } = useParams();
	const [anime, setAnime] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchUniqueAnime = async () => {
			try {
				const res = await fetchCollection(slug);
				setAnime(res[0]);
				setLoading(false);
			} catch (err) {
				setError("Error fetching anime data");
				setLoading(false);
			}
		};

		fetchUniqueAnime();
	}, [slug]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	if (!anime) {
		return <div>Anime not found</div>;
	}

	return (
		<main className='ml-2 flex justify-around content-center flex-wrap'>
			<CardDetail
				id={anime.id}
				author={anime.author}
				genre={anime.genre}
				main_character={anime.main_character}
				seasons={anime.seasons}
				synopsis={anime.synopsis}
				title={anime.title}
				url={anime.thumbnail}
				key={anime.id}
			/>
		</main>
	);
};

export default Detail;
