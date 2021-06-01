import jujutsu from './images/jujutsu.jpg';
import onepiece from './images/onepiece.jpeg';
import fireforce from './images/fireforce.jpeg';
import naruto from './images/naruto.jpeg';
import attackontitan from './images/attackontitan.jpeg';
import myheroacademia from './images/myheroacademia.jpeg'

export default function getGallery() {
    return [
        {id: 'jujutsu', name: 'Jujutsu', cover: jujutsu},
        {id: 'onepiece', name: 'One Piece', cover: onepiece},
        {id: 'fireforce', name: 'Fire Force', cover: fireforce},
        {id: 'naruto', name: 'Naruto', cover: naruto}, 
        {id: 'myheroacademia', name: 'My Hero Academia', cover: myheroacademia},
        {id: 'attackontitan', name: 'Attack on Titan', cover: attackontitan}
    ]
}
