const { connectionDb } = require('./connectDB');

const testConnection = async ()=> {
    try {
        console.log('Try to connect');
        
        await connectionDb();
        console.log('Test Successful');
        console.log('Db Connected');
        console.log('To be continue......');

        process.exit(0);
    
    } catch (error) {
        console.log('Error', error.message);
        process.exit(1);
    }
}

testConnection();