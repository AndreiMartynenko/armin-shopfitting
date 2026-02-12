import requests
import sys
from datetime import datetime

class ArminShopfittingAPITester:
    def __init__(self, base_url="https://construct-homes-1.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None):
        """Run a single API test"""
        url = f"{self.base_url}/api/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"Response: {response_data}")
                    return True, response_data
                except:
                    return True, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"Response: {response.text}")
                self.failed_tests.append({
                    "test": name,
                    "endpoint": endpoint,
                    "expected": expected_status,
                    "actual": response.status_code,
                    "response": response.text
                })
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.failed_tests.append({
                "test": name,
                "endpoint": endpoint,
                "error": str(e)
            })
            return False, {}

    def test_root_endpoint(self):
        """Test API root endpoint"""
        return self.run_test("API Root", "GET", "", 200)

    def test_get_projects(self):
        """Test projects endpoint"""
        success, response = self.run_test("Get Projects", "GET", "projects", 200)
        if success and isinstance(response, list):
            print(f"Found {len(response)} projects")
            if len(response) > 0:
                project = response[0]
                required_fields = ['id', 'title', 'category', 'description', 'image_url', 'location', 'year']
                for field in required_fields:
                    if field not in project:
                        print(f"⚠️  Missing field '{field}' in project data")
                        return False
                print("✅ All required project fields present")
        return success

    def test_get_testimonials(self):
        """Test testimonials endpoint"""
        success, response = self.run_test("Get Testimonials", "GET", "testimonials", 200)
        if success and isinstance(response, list):
            print(f"Found {len(response)} testimonials")
            if len(response) > 0:
                testimonial = response[0]
                required_fields = ['id', 'name', 'company', 'quote', 'rating']
                for field in required_fields:
                    if field not in testimonial:
                        print(f"⚠️  Missing field '{field}' in testimonial data")
                        return False
                print("✅ All required testimonial fields present")
        return success

    def test_contact_form_submission(self):
        """Test contact form submission"""
        test_data = {
            "name": "Test User",
            "email": "test@example.com",
            "phone": "+44 123 456 7890",
            "service": "Property Analysis",
            "message": "This is a test message for the contact form."
        }
        
        success, response = self.run_test("Contact Form Submission", "POST", "contact", 200, test_data)
        if success:
            # Verify response contains the submitted data
            if 'id' in response and 'created_at' in response:
                print("✅ Contact form response includes ID and timestamp")
            else:
                print("⚠️  Contact form response missing ID or timestamp")
        return success

    def test_contact_form_validation(self):
        """Test contact form validation with missing required fields"""
        # Test with missing required fields
        invalid_data = {
            "name": "",  # Empty name
            "email": "invalid-email",  # Invalid email
            "service": "",  # Empty service
            "message": ""  # Empty message
        }
        
        success, response = self.run_test("Contact Form Validation", "POST", "contact", 422, invalid_data)
        return success

    def test_get_contact_inquiries(self):
        """Test getting contact inquiries"""
        return self.run_test("Get Contact Inquiries", "GET", "contact", 200)

def main():
    print("🚀 Starting Armin Shopfitting API Tests")
    print("=" * 50)
    
    tester = ArminShopfittingAPITester()
    
    # Run all tests
    tests = [
        tester.test_root_endpoint,
        tester.test_get_projects,
        tester.test_get_testimonials,
        tester.test_contact_form_submission,
        tester.test_contact_form_validation,
        tester.test_get_contact_inquiries
    ]
    
    for test in tests:
        test()
    
    # Print final results
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} passed")
    
    if tester.failed_tests:
        print("\n❌ Failed Tests:")
        for failed in tester.failed_tests:
            error_msg = failed.get('error', f"Status {failed.get('actual')} (expected {failed.get('expected')})")
            print(f"  - {failed['test']}: {error_msg}")
    
    success_rate = (tester.tests_passed / tester.tests_run) * 100 if tester.tests_run > 0 else 0
    print(f"\n🎯 Success Rate: {success_rate:.1f}%")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())