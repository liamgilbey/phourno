# Step 1: Build the Go binary
# Use the official Golang image to build the app
FROM golang:1.23.1-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy the Go mod and sum files for dependency resolution
COPY go.mod go.sum ./

# Copy the rest of the application code
COPY . .

# Build the application
RUN go build -o /phourno .

# Step 2: Run the app using a minimal base image
FROM alpine:latest

# Set the working directory in the final image
WORKDIR /app

# Copy the binary from the builder
COPY --from=builder /phourno /app/phourno

# Expose the port that the application will run on
EXPOSE 8080

# Run the app
CMD ["./phourno"]
