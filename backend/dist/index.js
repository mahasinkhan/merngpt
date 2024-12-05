import app from './app.js'; // Import your Express app
import connectToDatabase from './db/connection.js'; // Import the connectToDatabase function
const PORT = process.env.PORT || 5000;
// Function to start the server
const startServer = async () => {
    try {
        // Attempt to connect to the database
        await connectToDatabase();
        console.log('🟢 Database connected successfully.');
        // Start the server once the database is connected
        app.listen(PORT, () => {
            console.log('🟢 Server running on http://localhost:5000');
        });
    }
    catch (error) {
        // Handle any errors during database connection
        console.error('🔴 Error connecting to the database:', error.message);
        process.exit(1); // Exit the process if connection fails
    }
};
// Call the startServer function to initiate the app
startServer();
//# sourceMappingURL=index.js.map