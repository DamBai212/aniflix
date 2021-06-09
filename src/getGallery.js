import jujutsu from './images/jujutsu.jpg';
import onepiece from './images/onepiece.jpeg';
import fireforce from './images/fireforce.jpeg';
import naruto from './images/naruto.jpeg';
import attackontitan from './images/attackontitan.jpeg';
import myheroacademia from './images/myheroacademia.jpeg'

export default function getGallery() {
    return [
        {id: 'jujutsu', name: 'Jujutsu', cover: jujutsu, synopsis: 'Yuji Itadori is a boy with tremendous physical strength, though he lives a completely ordinary high school life. One day, to save a classmate who has been attacked by curses, he eats the finger of Ryomen Sukuna, taking the curse into his own soul. From then on, he shares one body with Ryomen Sukuna. Guided by the most powerful of sorcerers, Satoru Gojo, Itadori is admitted to Tokyo Jujutsu High School, an organization that fights the curses... and thus begins the heroic tale of a boy who became a curse to exorcise a curse, a life from which he could never turn back.'},
        {id: 'onepiece', name: 'One Piece', cover: onepiece, synopsis: 'Follows the adventures of Monkey D. Luffy and his pirate crew in order to find the greatest treasure ever left by the legendary Pirate, Gold Roger. The famous mystery treasure named "One Piece".'},
        {id: 'fireforce', name: 'Fire Force', cover: fireforce, synopsis: 'Tokyo is burning, and citizens are mysteriously suffering from spontaneous human combustion all throughout the city! Responsible for snuffing out this inferno is the Fire Force, and Shinra is ready to join their fight. Now, as part of Company 8, he’ll use his devil’s footprints to help keep the city from turning to ash! But his past and a burning secret behind the scenes could set everything ablaze.'},
        {id: 'naruto', name: 'Naruto', cover: naruto, synopsis: 'Naruto Uzumaki wants to be the best ninja in the land. He has done well so far, but with the looming danger posed by the mysterious Akatsuki organization, Naruto knows he must train harder than ever and leaves his village for intense exercises that will push him to his limits. '}, 
        {id: 'myheroacademia', name: 'My Hero Academia', cover: myheroacademia, synopsis: 'Izuku has dreamt of being a hero all his life—a lofty goal for anyone, but especially challenging for a kid with no superpowers. That’s right, in a world where eighty percent of the population has some kind of super-powered “quirk,” Izuku was unlucky enough to be born completely normal. But that’s not enough to stop him from enrolling in one of the world’s most prestigious hero academies.'},
        {id: 'attackontitan', name: 'Attack on Titan', cover: attackontitan, synopsis: 'Known in Japan as Shingeki no Kyojin, many years ago, the last remnants of humanity were forced to retreat behind the towering walls of a fortified city to escape the massive, man-eating Titans that roamed the land outside their fortress. Only the heroic members of the Scouting Legion dared to stray beyond the safety of the walls – but even those brave warriors seldom returned alive. Those within the city clung to the illusion of a peaceful existence until the day that dream was shattered, and their slim chance at survival was reduced to one horrifying choice: kill – or be devoured!'}
    ]
}
