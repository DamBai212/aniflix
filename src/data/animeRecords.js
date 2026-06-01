import animeRecords from './animeRecords.json';

export default Object.freeze(animeRecords.map((anime) => Object.freeze({ ...anime })));
