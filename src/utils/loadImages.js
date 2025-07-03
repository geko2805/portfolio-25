// Load all thumbnails eagerly
const thumbs = import.meta.glob("/src/assets/thumbs/*.{png,jpg,jpeg,svg}", {
  eager: true,
  import: "default",
});

// Load all full-size images (static glob pattern)
const fullSizeImagesGlob = import.meta.glob(
  "/src/assets/full-size/*/*.{png,jpg,jpeg,svg,webp}",
  {
    eager: false, // Lazy-load images
    import: "default",
  }
);

// Function to dynamically load full-size images for a specific project
export const loadProjectImages = async (projectId) => {
  try {
    // Filter images for the specific projectId
    const projectImagePaths = Object.keys(fullSizeImagesGlob).filter((path) =>
      path.includes(`/full-size/${projectId}/`)
    );

    if (projectImagePaths.length === 0) {
      console.warn(`No images found for project: ${projectId}`);
      return [];
    }

    const sorted = projectImagePaths.sort((a, b) => a.localeCompare(b));

    // Load the filtered images
    const loadedImages = await Promise.all(
      sorted.map(async (path) => {
        const module = await fullSizeImagesGlob[path]();
        return module;
      })
    );

    return loadedImages;
  } catch (error) {
    console.error(`Error loading images for project ${projectId}:`, error);
    return [];
  }
};

// Utility to get thumbnail for a project
export const getThumbnail = (projectId) => {
  const thumbPath = Object.keys(thumbs).find((path) =>
    path.includes(projectId)
  );
  return thumbs[thumbPath] || null;
};
