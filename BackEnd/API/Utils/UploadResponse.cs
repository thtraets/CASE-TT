using Newtonsoft.Json;

namespace API.Utils
{
    // This class serves as a response object from the server, telling the client how much has been added and/or how many duplicates were found
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
