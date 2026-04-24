import app from "./app";
import hotelRoutes from "../src/routes/hotelRoutes"
app.use("/api", hotelRoutes);
app.get("/", (req, res) => {
  res.send("Server working ✅");
});
app.listen(3000,()=>{
    console.log(`Server is running at 3000`);
})