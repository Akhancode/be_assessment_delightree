# BE_Assessment-Delightree
This project is a GraphQL API for an e-commerce platform to analyze revenue, customer spending behavior, and product sales trends.

## Installation Guide

1. **Clone the Repository:**
   ```sh
   git clone https://github.com/Akhancode/be_assessment_delightree.git
   cd be_assessment_delightree
   ```

2. **Install Dependencies:**
   ```sh
   npm install
   ```

3. **Set Up Environment Variables:**
   Download the `.env` file from the following link  (unzip this file )and place it in your project root:
   [Download .env file](https://drive.google.com/file/d/15opHZW8BgCL0cLIRM79OWqG8yBwcxaTx/view?usp=sharing)
   


4. **Run the Server:**
   ```sh
   npm start
   ```

## Redis Setup

- ✅ **Set up Redis locally and run Redis on port `6379`**  
- ✅ **Handled errors gracefully even if Redis is down**  

## Branches

- 🔀 **`main-without-redis`** – Branch without Redis caching  
- 🔀 **`main-with-redis`** – Branch with Redis caching same as **`main`**

## Bonus Tasks

- ✅ **Optimized MongoDB Aggregation Queries**
- ✅ **Used Redis Caching for `getSalesAnalytics`**
- ✅ **Implemented `getAllProducts` Query**
- ✅ **Implemented extra queries to fetch:**
  - `getAllCustomers`
  - `getCustomerById`
  - `getAllOrders`
  - `getOrderById`
  - `getCustomerOrders`
  - `getAllProducts`

## Running Queries in Postman

1. Open Postman.
2. Set the request type to `POST`.
3. Use the GraphQL endpoint:
   ```
   http://localhost:4000/graphql
   ```
4. Add your GraphQL query in the request body.
5. Click **Send** to get the response.

---
# 📌 GraphQL Queries  

All queries are available in the **`queries.graphql`** file located in the **root folder**.  

## 🔹 How to Use the Queries?  
Copy and paste the queries from `queries.graphql` into:  

1. **GraphQL Playground** → `http://localhost:4000/graphql`  
2. **Postman** → Select **POST** request and enter `http://localhost:4000/graphql`  on request body

### 1️⃣ Get Customer Spending
```graphql
query {
  getCustomerSpending(customerId: "63f8b3d5a7b1d7f3b0a2c5e1") {
    customerId
    totalSpent
    averageOrderValue
    lastOrderDate
  }
}
```

### 2️⃣ Get Top Selling Products
```graphql
query {
  getTopSellingProducts(limit: 5) {
    productId
    name
    totalSold
  }
}
```

### 3️⃣ Get Sales Analytics
```graphql
query {
  getSalesAnalytics(startDate: "2024-01-01", endDate: "2024-12-31") {
    totalRevenue
    completedOrders
    categoryBreakdown {
      category
      revenue
    }
  }
}
```
### 4️⃣`getCustomerOrders` Query  

Fetch paginated customer orders with an optional filter by `customerId`.  

## 🔹 Parameters  
- `customerId` (ID) → Optional, filter by customer  
- `limit` (Int) → Optional, number of orders per page (default: 10)  
- `page` (Int) → Optional, page number (default: 1)  


## 🔹 Query  
```graphql
query getCustomerOrders($customerId: ID, $limit: Int = 10, $page: Int = 1) {
  getCustomerOrders(customerId: $customerId, limit: $limit, page: $page) {
    orders {
      _id
      customerId
      totalAmount
      orderDate
      status
    }
    pagination {
      totalOrders
      totalPages
      currentPage
    }
  }
}
```

