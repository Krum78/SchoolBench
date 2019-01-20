using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using SelfStudy.Api.Models;
using SelfStudy.Api.Services;

namespace SelfStudy.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesController : ControllerBase
    {

        private readonly IDbAccessService _dbAccess;

        public FilesController(IDbAccessService dbAccess)
        {
            _dbAccess = dbAccess;
        }

        [HttpGet]
        [Route("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<byte[]>> GetFile(Guid id)
        {
            var fileModel = await _dbAccess.GetFile(id);

            return File(fileModel.FileContent, fileModel.ContentType, fileModel.FileName);
        }

        [HttpPost]
        [Authorize(Roles = "ContentCreator")]
        public async Task<ActionResult<string>> PostFile()
        {
            if (!Request.HasFormContentType || Request.Form.Files.Count == 0)
                return BadRequest("No files found in request");

            var file = Request.Form.Files.First();

            FileModel model = new FileModel
            {
                FileName = file.FileName,
                ContentType = file.ContentType
            };

            using (MemoryStream ms = new MemoryStream())
            {
                await file.CopyToAsync(ms);
                model.FileContent = ms.ToArray();
            }
            
            var storedFile = await _dbAccess.UploadFile(model);

            return Ok(new { location = $"{Request.GetEncodedUrl()}/{storedFile.Id}"});
        }
    }
}