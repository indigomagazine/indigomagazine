// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the theme toggle button
    const themeToggle = document.getElementById('themeToggle');
    // Get the logo image
    const logoImage = document.getElementById('logoImage');
    
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
      updateLogoForTheme('dark');
    }
    
    // Theme toggle functionality
    themeToggle.addEventListener('click', function() {
      // Toggle dark theme class
      document.body.classList.toggle('dark-theme');
      
      // Determine current theme after toggle
      const isDarkTheme = document.body.classList.contains('dark-theme');
      
      // Update logo based on theme
      updateLogoForTheme(isDarkTheme ? 'dark' : 'light');
      
      // Save preference to localStorage
      localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
    });
    
    // Function to update logo based on theme
    function updateLogoForTheme(theme) {
      if (theme === 'dark') {
        // Use white logo for dark theme
        logoImage.src = 'assets/logos/indigologowhite.png';
      } else {
        // Assume there's a dark logo for light theme
        // If not available, keep using the white logo
        if (logoExists('assets/logos/indigologoblack.png')) {
          logoImage.src = 'assets/logos/indigologoblack.png';
        }
      }
    }
    
    // Helper function to check if a file exists (not reliable in all browsers)
    function logoExists(url) {
      // This is a placeholder - in a real implementation, you might
      // want to preload both logos or handle this differently
      return true;
    }
  });

const btn = document.getElementById('themeToggle');
btn.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark-theme');
  // Optionally save to localStorage:
  const isDark = document.documentElement.classList.contains('dark-theme');
  localStorage.setItem('darkMode', isDark);
});

// On load, re-apply saved theme:
if (localStorage.getItem('darkMode') === 'true') {
  document.documentElement.classList.add('dark-theme');
}