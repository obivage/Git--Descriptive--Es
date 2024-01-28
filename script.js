class Movie {
  constructor(title, genre, stock) {
    this.title = title;
    this.genre = genre;
    this.stock = stock;
  }

  rent() {
    if (this.stock > 0) {
      this.stock--;
      return true;
    } else {
      console.log(`Sorry, ${this.title} is out of stock.`);
      return false;
    }
  }

  returnMovie() {
    this.stock++;
  }
}

class Customer {
  constructor(name) {
    this.name = name;
    this.rentals = [];
  }

  rentMovie(movie) {
    if (movie.rent()) {
      const rental = new Rental(movie);
      this.rentals.push(rental);
      console.log(`${this.name} rented ${movie.title}.`);
    }
  }

  returnMovie(rental) {
    rental.returnMovie();
    console.log(`${this.name} returned ${rental.movie.title}.`);
  }
}

class Rental {
  constructor(movie) {
    this.movie = movie;
    this.rentalDate = new Date();
  }

  returnMovie() {}
}

const movie1 = new Movie("Inception", "Sci-Fi", 5);
const movie2 = new Movie("The Shawshank Redemption", "Drama", 3);

const customer1 = new Customer("John Doe");

customer1.rentMovie(movie1);
customer1.rentMovie(movie2);

customer1.rentMovie(movie1);

customer1.returnMovie(customer1.rentals[0]);

console.log(`Stock of ${movie1.title}: ${movie1.stock}`);
console.log(`Stock of ${movie2.title}: ${movie2.stock}`);
