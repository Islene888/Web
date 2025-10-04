const { takeScreenshot, takeAdvancedScreenshot, takeMultipleScreenshots } = require('./screenshot');
const path = require('path');

/**
 * Test suite for screenshot functionality
 */
async function runTests() {
  console.log('🧪 Starting Screenshot Testing Suite\n');

  // Test URLs - including your homework projects
  const testUrls = [
    'https://example.com',
    'https://github.com',
    'https://developer.mozilla.org',
    // Add your local homework URLs when you serve them locally
    // 'http://localhost:3000/homework1',
    // 'http://localhost:3000/homework2'
  ];

  try {
    // Test 1: Basic Screenshot
    console.log('📸 Test 1: Basic Screenshot');
    console.log('----------------------------------------');
    await testBasicScreenshot();

    // Test 2: Advanced Screenshot with Options
    console.log('\n📸 Test 2: Advanced Screenshot with Options');
    console.log('----------------------------------------');
    await testAdvancedScreenshot();

    // Test 3: Multiple Screenshots
    console.log('\n📸 Test 3: Multiple Screenshots');
    console.log('----------------------------------------');
    await testMultipleScreenshots(testUrls.slice(0, 2)); // Test first 2 URLs

    // Test 4: Different Viewport Sizes
    console.log('\n📸 Test 4: Different Viewport Sizes');
    console.log('----------------------------------------');
    await testDifferentViewports();

    console.log('\n✅ All tests completed successfully!');
    console.log('📁 Check the screenshots folder for results');

  } catch (error) {
    console.error('\n❌ Test suite failed:', error);
    process.exit(1);
  }
}

/**
 * Test basic screenshot functionality
 */
async function testBasicScreenshot() {
  try {
    const url = 'https://example.com';
    console.log(`Taking basic screenshot of: ${url}`);

    const result = await takeScreenshot(url, 'test_basic.png');
    console.log(`✅ Basic screenshot saved: ${result}`);

  } catch (error) {
    console.error('❌ Basic screenshot test failed:', error.message);
    throw error;
  }
}

/**
 * Test advanced screenshot with options
 */
async function testAdvancedScreenshot() {
  try {
    const url = 'https://github.com';
    console.log(`Taking advanced screenshot of: ${url}`);

    const result = await takeAdvancedScreenshot(url, {
      filename: 'test_advanced.png',
      width: 1920,
      height: 1080,
      fullPage: true,
      waitTime: 3000
    });

    console.log(`✅ Advanced screenshot saved: ${result}`);

  } catch (error) {
    console.error('❌ Advanced screenshot test failed:', error.message);
    throw error;
  }
}

/**
 * Test multiple screenshots
 */
async function testMultipleScreenshots(urls) {
  try {
    console.log(`Taking screenshots of ${urls.length} URLs...`);

    const results = await takeMultipleScreenshots(urls, {
      filename: 'test_multiple.png',
      width: 1280,
      height: 800,
      waitTime: 2000
    });

    console.log('\n📊 Multiple Screenshot Results:');
    results.forEach((result, index) => {
      if (result.success) {
        console.log(`✅ ${index + 1}. ${result.url} - Success`);
      } else {
        console.log(`❌ ${index + 1}. ${result.url} - Failed: ${result.error}`);
      }
    });

  } catch (error) {
    console.error('❌ Multiple screenshots test failed:', error.message);
    throw error;
  }
}

/**
 * Test different viewport sizes
 */
async function testDifferentViewports() {
  try {
    const url = 'https://developer.mozilla.org';

    // Test mobile viewport
    console.log('📱 Testing mobile viewport (375x667)...');
    await takeAdvancedScreenshot(url, {
      filename: 'test_mobile.png',
      width: 375,
      height: 667,
      fullPage: false
    });

    // Test tablet viewport
    console.log('📱 Testing tablet viewport (768x1024)...');
    await takeAdvancedScreenshot(url, {
      filename: 'test_tablet.png',
      width: 768,
      height: 1024,
      fullPage: false
    });

    // Test desktop viewport
    console.log('🖥️  Testing desktop viewport (1920x1080)...');
    await takeAdvancedScreenshot(url, {
      filename: 'test_desktop.png',
      width: 1920,
      height: 1080,
      fullPage: false
    });

    console.log('✅ Viewport tests completed');

  } catch (error) {
    console.error('❌ Viewport test failed:', error.message);
    throw error;
  }
}

/**
 * Performance test - measure screenshot time
 */
async function performanceTest() {
  console.log('\n⏱️  Performance Test');
  console.log('----------------------------------------');

  try {
    const url = 'https://example.com';
    const startTime = Date.now();

    await takeScreenshot(url, 'performance_test.png');

    const endTime = Date.now();
    const duration = endTime - startTime;

    console.log(`⏱️  Screenshot took: ${duration}ms`);

    if (duration < 5000) {
      console.log('✅ Performance: Good (< 5 seconds)');
    } else if (duration < 10000) {
      console.log('⚠️  Performance: Acceptable (5-10 seconds)');
    } else {
      console.log('❌ Performance: Slow (> 10 seconds)');
    }

  } catch (error) {
    console.error('❌ Performance test failed:', error.message);
  }
}

/**
 * Generate a test report
 */
function generateTestReport(results) {
  const report = {
    timestamp: new Date().toISOString(),
    totalTests: results.length,
    successful: results.filter(r => r.success).length,
    failed: results.filter(r => !r.success).length,
    results: results
  };

  console.log('\n📊 Test Report Summary:');
  console.log(`Total Tests: ${report.totalTests}`);
  console.log(`Successful: ${report.successful}`);
  console.log(`Failed: ${report.failed}`);
  console.log(`Success Rate: ${((report.successful / report.totalTests) * 100).toFixed(1)}%`);

  return report;
}

// Run tests if this file is executed directly
if (require.main === module) {
  console.log('🚀 Running Screenshot Testing Suite...\n');

  runTests()
    .then(() => {
      console.log('\n🎉 Testing completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Testing failed:', error);
      process.exit(1);
    });
}

module.exports = {
  runTests,
  testBasicScreenshot,
  testAdvancedScreenshot,
  testMultipleScreenshots,
  performanceTest
};