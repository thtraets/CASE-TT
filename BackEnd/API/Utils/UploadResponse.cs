using Newtonsoft.Json;

namespace API.Utils
{
    public class UploadResponse
    {
        [JsonProperty("InstancesAdded")]
        public int InstancesAdded { get; set; }
        [JsonProperty("CoursesAdded")]
        public int CoursesAdded { get; set; }
        [JsonProperty("DuplicateInstances")]
        public int DuplicateInstances { get; set; }
        [JsonProperty("DuplicateCourse")]
        public int DuplicateCourses { get; set; }
    }
}
