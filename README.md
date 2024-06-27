# Phase 5 Full-Stack Application Project

## Introduction

This is a Flask-React application that represents a event-planning platform that allows users to create bookings with their desired time, date, and number of guests as well as browse options for venues, vendors, and entertainers. The application opens initially to a signup/login menu and authenticates users to make sure they have gained access to the product list as well as have to power to edit and delete their own product reviews.

## Setup

### `server/`

The `server/` directory contains all of your backend code and `app.py` is the Flask application. 

The project contains a `Pipfile` with this projects dependencies.

To download the dependencies for the backend server, run:

```console
pipenv install
pipenv shell
```

You can run your Flask API on [`localhost:5555`](http://localhost:5555) by
running:

```console
python server/app.py
```
### `client/`

The `client/` directory contains all of the frontend code. The file
`package.json` has been configured with the necessary React application dependencies.

To download the dependencies for the frontend client, run:

```console
npm install --prefix client
```

You can run your React app on [`localhost:3000`](http://localhost:3000) by
running:

```sh
npm start --prefix client
```

Check that your the React client displays a default page
`http://localhost:3000`. You should see the login page of the React app.

### src/components/
#### `NavBar.js`
NavBar is, as the name implies, the navigation bar for the application providing the user access to different routes housed within the NavBar. The navigation links are implemented using the NavLink component from React Router.

The handleLogoutClick function sends a DELETE request to the server when the user clicks the "Logout" button. 

#### `LoginForm.js`
LoginForm is responsible for rendering a login form and handling user authentication. It utilizes useState to manage loading state and error messages. The useContext hook is used to access the setUser function from the UserContext, enabling the component to update the global user state upon successful login.

The handleSubmit function sends a POST request to the server with the login credentials provided by the user then sets the user in the context or displays errors to the user.

Form validation is implemented using the Yup library, ensuring that the username and password meet certain criteria (minimum length and presence) as well as managing form state, validation, and submission.

#### `SignUpForm.js`
SignUpForm is similar to LoginForm but instead of fetching an existing user, it sends a POST request to the server to create a new user and add then to the database. Once created, the user is logged in.

#### `VenueCard.js`
VendorCard represents a card displaying information about a specific vendor. It includes the venues's name, location, time open, time closed, occupancy and rate per hour. It also adds a button that allows the user to choose that venue and add it to their booking when logged in.

#### `VendorCard.js`
VendorCard represents a card displaying information about a specific vendor. It includes the vendor's name, type, and per person fee. It also adds a button that allows the user to choose that vendor and add it to their booking when logged in.

#### `EntertainmentCard.js`
EntertainmentCard represents a card displaying information about a specific entertainer. It includes the entertainer's name, type, and rate per hour. It also adds a button that allows the user to choose that vendor and add it to their booking when logged in.

#### `BookingCard.js`
The BookingCard component shows the user all of their confirmed bookings when logged in and facilitates viewing, editing, and deleting booking details. It integrates with backend APIs to update bookings and handles user interactions through forms and UI controls. When the setEditing state is toggled the user can change booking details such as date, start time, end time, and number of guests which is then reflected in the total price once the form is submitted.

Yup is used for schema validation for form inputs and formik is used for form management and submission handling.

#### `BookingForm.js`
The BookingForm component allows users to input booking details such as date, start time, end time, and number of guests. It validates user inputs and updates context using React's useContext hook. The values for the pending booking are held in BookingContext upon successful form submission so allows the user to browse more options to add to their booking. It then navigates to the next step in the booking process. 

Yup is used for schema validation for form inputs and formik is used for form management and submission handling.

### src/pages/
#### `App.js`
This React component serves as the main entry point for the application when a user is logged in. It utilizes the useContext hook to access the user context, determining whether a user is logged in or not. If no user is detected, it renders the Login component, prompting the user to log in. Once logged in, it renders the Home component and the BookingForm, providing access to the main functionality of the application. 

#### `Confirmation.js`
The Confirmation component displays all the booking details held in context from the booking form as well as each vendor, venue, and entertainment the user may or may not have chosen. It also displays the calculated total cost of the event based on the per person and per hour rates. Since the information is coming from the BookingContext, the code in context makes sure the display persists with the correct details on refresh and the user is prompted to review and confirm the information shown.

Once the user confirms the booking, the page displays a thank you message and leads them to their user profile to view their confirmed bookings.

#### `Venues.js`
The Venues component fetches a list of venues from a backend API and displays them as VenueCard components, allowing users to select one venue from the list. It integrates with Google Maps for displaying venue locations at the top of the page. 

Upon render the default parameters for geocoding using react-geocode, including the API key, language, and region are set. It iterates over venueAddressList, which contains addresses of venues fetched earlier and makes a geocoding request to access the longitude and latitude for each address. 

'Promise.all' collects all promises (geocodePromises) into an array and waits for all of them to resolve. Once all promises are resolved, it filters out null responses and maps the valid responses to Marker components for Google Maps.

#### `Vendors.js`
The Vendors component fetches a list of vendors from a backend API and displays them as VendorCard components, allowing users to select one vendor from the list. 

#### `Entertainment.js`
The Entertainment component fetches a list of vendors from a backend API and displays them as EntertainmentCard components, allowing users to select one entertainer from the list. 

#### `ErrorPage.js`
The page contains a generic error message for general error handling.

#### `Home.js`
The Home page is an intro the the app, how it functions, and guide for how the user should start on creating their booking.

#### `Login.js`
If there is no user logged in, the Login page component will render either the LoginForm or the SignUpForm based on which option the user chooses. If there is a user logged in, however, the App.js component will render.

#### `UserProfile.js`
If there is no user logged in, the UserProfile page component will filter through all bookings to find the bookings that belong to that specific user and map through that list to display each booking as a BookingCard component.

### src/contexts/
#### `UserContext.js`
UserContext context object is created to share user data across components.
UserProvider manages the user data and provides it to its children components. useEffect performs auto-login by sending a request to check the session on reload. If the session id is found, it sets the user data.

#### `BookingContext.js`
This is a context object created to share product data across components. The BookingProvider component is a provider for the BookingContext which holds the state of the details to the current booking the user has compiled through each step in the booking process. 

useEffect fetches the JSON string stored under the key "booking" in sessionStorage using 'sessionStorage.getItem("booking")' - which was converted from the bookingData object - and is then stored in storedData. If storedData exists, the second useEffect updates the state for the corresponding attribute when one is updated. The use of session storage allows us to access the pre-selected details from state on the Confirmation page as well as make sure they persist even if the user refreshes that page.

### `Globals.js`
Contains headers to be used in fetch requests.

### `index.js`
The main component of the application, where the UI and functionality are defined. It configures routing and renders the application's main components (App) wrapped with User and Booking context providers as well as the router provider, which mounts them in the HTML document's "root" container.

### `routes.js`
Contains a list of routing objects consisting of the path, the element, and the errorElement.

## Working With Your Database

Change into the `server` directory:

```console
cd server
```

If you wish to edit, add to, or update the databse, enter the commands below to do so:

```
flask db migrate
flask db upgrade head
```
or 
```
flask db revision --autogenerate -m'<descriptive message>'
flask db upgrade head
```

#### `config.py`

Here I've outline the necessary imports to run the backend. You will find also the code that instantiates the app with REST API and sets its attributes. 


#### `app.py`

app.py houses all of the functionalities that the database carries out. Below is a brief description of each function:

-Signup: Handles user registration, creates a new user in the databse, and returns the new user.
-CheckSession: Checks if a user session is active and returns the corresponding user object.
-Login: Authenticates users based on username and password.
-Logout: Clears the current user session.
-Users: Retrieves a list of all users.
-Venues: Retrieves a list of all venues.
-Vendors: Retrieves a list of all vendor.
-Entertainments: Retrieve a list of all entertainments.
-Bookings: Retrieves all bookings or creates a new booking.
-BookingByID: Retrieves, updates, or deletes a specific booking by its ID.

#### `models.py`
Here you'll find five models: User, Booking, Venue, Vendor, Entertainment. The models User and Venue share a many to many relationship with each other as they have a one to many relationship to the Booking. User shares this many to many relationship via Booking with both Venue and Vendor as well. The Booking model also has a property that will calculate the total price of the associated attributes if they attached to a specific booking.

#### `seed.py` 
The seed file contains test data for the application from the faker import, which you can compile by running:

```console
python server/seed.py
```

### Conclusion
Hope you enjoy playing around with all the possibilities of this app!
