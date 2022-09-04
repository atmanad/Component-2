using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using TweetApp.Backend.Dto;
using TweetApp.Backend.Interfaces;
using TweetApp.Backend.Models;

namespace TweetApp.Backend.Controllers
{
    [Route("api/tweets")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public AuthController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        //[HttpPost("register")]
        //public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        //{
        //    if (await _unitOfWork.User.IsUniqueUser(registerDto.Email))
        //    {
        //        return BadRequest("User already exists");
        //    }
        //    var user = _mapper.Map<User>(registerDto);
        //    await _unitOfWork.User.Add(user);
        //    await _unitOfWork.Save();
        //    return Ok(user);
        //}

        //[HttpPost("login")]
        //public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        //{
        //    if (loginDto == null)
        //    {
        //        return BadRequest();
        //    }
        //    try
        //    {
        //        var user = await _unitOfWork.User.Get(x => x.Email == loginDto.Username && x.Password == loginDto.Password);
        //        if (user == null) return NotFound("User not found or Password incorrect");
        //        return Ok("Success");
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex);
        //    }
        //}
        //[Route("{username}/forgot")]
        //[HttpPut]
        //public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto resetPasswordDto)
        //{
        //    try
        //    {
        //        var user = await _unitOfWork.User.Get(x => x.Email == resetPasswordDto.Username);
        //        if (user == null) return BadRequest("User not found");
        //        user.Password = resetPasswordDto.Password;
        //        _unitOfWork.User.Update(user);
        //        await _unitOfWork.Save();
        //        return Ok("Password reset successful");
        //    }
        //    catch(Exception ex)
        //    {
        //        return StatusCode(500, ex);
        //    }
        //}

    }
}
