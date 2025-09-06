#!/bin/bash

# School Attendance System API - Smoke Test Script
# This script tests the basic functionality of the API

BASE_URL="http://localhost:8001/api"
ADMIN_EMAIL="admin@school.com"
TEACHER_EMAIL="teacher@school.com"
PASSWORD="password"

echo "🚀 Starting School Attendance System API Smoke Test"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to make HTTP requests
make_request() {
    local method=$1
    local endpoint=$2
    local data=$3
    local token=$4
    local expected_status=$5

    if [ -n "$token" ]; then
        if [ -n "$data" ]; then
            response=$(curl -s -w "\n%{http_code}" -X $method \
                -H "Content-Type: application/json" \
                -H "Authorization: Bearer $token" \
                -d "$data" \
                "$BASE_URL$endpoint")
        else
            response=$(curl -s -w "\n%{http_code}" -X $method \
                -H "Authorization: Bearer $token" \
                "$BASE_URL$endpoint")
        fi
    else
        if [ -n "$data" ]; then
            response=$(curl -s -w "\n%{http_code}" -X $method \
                -H "Content-Type: application/json" \
                -d "$data" \
                "$BASE_URL$endpoint")
        else
            response=$(curl -s -w "\n%{http_code}" -X $method \
                "$BASE_URL$endpoint")
        fi
    fi

    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | head -n -1)

    if [ "$http_code" = "$expected_status" ]; then
        echo -e "${GREEN}✅ PASS${NC} - $method $endpoint (Status: $http_code)"
        return 0
    else
        echo -e "${RED}❌ FAIL${NC} - $method $endpoint (Expected: $expected_status, Got: $http_code)"
        echo "Response: $body"
        return 1
    fi
}

# Test 1: Admin Login
echo -e "\n${YELLOW}Test 1: Admin Login${NC}"
admin_response=$(curl -s -X POST \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"$ADMIN_EMAIL\",\"password\":\"$PASSWORD\"}" \
    "$BASE_URL/auth/login")

admin_token=$(echo "$admin_response" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)

if [ -n "$admin_token" ]; then
    echo -e "${GREEN}✅ PASS${NC} - Admin login successful"
else
    echo -e "${RED}❌ FAIL${NC} - Admin login failed"
    echo "Response: $admin_response"
    exit 1
fi

# Test 2: Teacher Login
echo -e "\n${YELLOW}Test 2: Teacher Login${NC}"
teacher_response=$(curl -s -X POST \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"$TEACHER_EMAIL\",\"password\":\"$PASSWORD\"}" \
    "$BASE_URL/auth/login")

teacher_token=$(echo "$teacher_response" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)

if [ -n "$teacher_token" ]; then
    echo -e "${GREEN}✅ PASS${NC} - Teacher login successful"
else
    echo -e "${RED}❌ FAIL${NC} - Teacher login failed"
    echo "Response: $teacher_response"
    exit 1
fi

# Test 3: Get Classes (Admin)
echo -e "\n${YELLOW}Test 3: Get Classes (Admin)${NC}"
make_request "GET" "/classes" "" "$admin_token" "200"

# Test 4: Get Students (Admin)
echo -e "\n${YELLOW}Test 4: Get Students (Admin)${NC}"
make_request "GET" "/students" "" "$admin_token" "200"

# Test 5: Create New Class (Admin)
echo -e "\n${YELLOW}Test 5: Create New Class (Admin)${NC}"
make_request "POST" "/classes" '{"name":"Test Class"}' "$admin_token" "201"

# Test 6: Get Classes for Teacher
echo -e "\n${YELLOW}Test 6: Get Classes for Teacher${NC}"
make_request "GET" "/teacher/classes" "" "$teacher_token" "200"

# Test 7: Get Students for Teacher
echo -e "\n${YELLOW}Test 7: Get Students for Teacher${NC}"
make_request "GET" "/teacher/students" "" "$teacher_token" "200"

# Test 8: Mark Attendance (Teacher)
echo -e "\n${YELLOW}Test 8: Mark Attendance (Teacher)${NC}"
attendance_data='{
    "class_id": 1,
    "date": "2025-09-06",
    "attendances": [
        {"student_id": 1, "status": "present"},
        {"student_id": 2, "status": "absent"}
    ]
}'
make_request "POST" "/attendance/mark" "$attendance_data" "$teacher_token" "201"

# Test 9: Try to mark duplicate attendance (should fail)
echo -e "\n${YELLOW}Test 9: Duplicate Attendance (Should Fail)${NC}"
make_request "POST" "/attendance/mark" "$attendance_data" "$teacher_token" "409"

# Test 10: Get Student Report
echo -e "\n${YELLOW}Test 10: Get Student Report${NC}"
make_request "GET" "/reports/student/1" "" "$admin_token" "200"

# Test 11: Get Class Monthly Report
echo -e "\n${YELLOW}Test 11: Get Class Monthly Report${NC}"
make_request "GET" "/reports/class?class_id=1&month=2025-09" "" "$admin_token" "200"

# Test 12: Unauthorized Access (Teacher trying to access admin endpoint)
echo -e "\n${YELLOW}Test 12: Unauthorized Access (Teacher -> Admin)${NC}"
make_request "GET" "/teachers" "$teacher_token" "" "403"

# Test 13: Invalid Credentials
echo -e "\n${YELLOW}Test 13: Invalid Credentials${NC}"
make_request "POST" "/auth/login" '{"email":"admin@school.com","password":"wrongpassword"}' "" "422"

# Test 14: Missing Authentication
echo -e "\n${YELLOW}Test 14: Missing Authentication${NC}"
make_request "GET" "/classes" "" "" "401"

# Test 15: Logout
echo -e "\n${YELLOW}Test 15: Logout${NC}"
make_request "POST" "/auth/logout" "" "$admin_token" "200"

echo -e "\n${GREEN}🎉 Smoke Test Completed!${NC}"
echo "=================================================="
echo "If all tests passed, your API is working correctly!"
echo ""
echo "Next steps:"
echo "1. Test with the provided examples.http file"
echo "2. Integrate with your frontend application"
echo "3. Deploy to production environment"

