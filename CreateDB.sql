/****** Object:  Table [dbo].[AnswerOptions]    Script Date: 1/26/2019 7:13:04 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AnswerOptions](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[QuestionId] [bigint] NOT NULL,
	[ItemOrder] [int] NOT NULL,
	[Text] [nvarchar](250) NOT NULL,
	[IsCorrect] [bit] NOT NULL,
	[DateCreated] [datetime] NOT NULL CONSTRAINT [DF_TestItemOptions_DateCreated]  DEFAULT (getdate()),
	[Creator] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_TestItemOptions] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)

GO
/****** Object:  Table [dbo].[CourseModules]    Script Date: 1/26/2019 7:13:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[CourseModules](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[CourseId] [bigint] NOT NULL,
	[Name] [nvarchar](150) NOT NULL,
	[Description] [nvarchar](max) NULL,
	[Data] [varbinary](max) NULL,
	[ContentLink] [nvarchar](500) NULL,
	[IsLink] [bit] NOT NULL CONSTRAINT [DF_CourceModules_IsLink]  DEFAULT ((0)),
	[DateCreated] [datetime] NOT NULL CONSTRAINT [DF_CourceModules_DateCreated]  DEFAULT (getdate()),
	[Creator] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_CourceModules] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Courses]    Script Date: 1/26/2019 7:13:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Courses](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](150) NOT NULL,
	[Description] [nvarchar](max) NULL,
	[DateCreated] [datetime] NOT NULL CONSTRAINT [DF_Cources_DateCreated]  DEFAULT (getdate()),
	[Creator] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Cources] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)

GO
/****** Object:  Table [dbo].[Files]    Script Date: 1/26/2019 7:13:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Files](
	[Id] [uniqueidentifier] NOT NULL CONSTRAINT [DF_Files_Id]  DEFAULT (newsequentialid()),
	[FileName] [nvarchar](250) NOT NULL,
	[FileContent] [varbinary](max) NOT NULL,
	[ContentType] [varchar](100) NOT NULL,
 CONSTRAINT [PK_Files] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[ModuleTests]    Script Date: 1/26/2019 7:13:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ModuleTests](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[ModuleId] [bigint] NOT NULL,
	[Name] [nvarchar](250) NOT NULL,
	[Description] [nvarchar](max) NOT NULL,
	[DateCreated] [datetime] NOT NULL CONSTRAINT [DF_ModuleTests_DateCreated]  DEFAULT (getdate()),
	[Creator] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_ModuleTests] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)

GO
/****** Object:  Table [dbo].[Questions]    Script Date: 1/26/2019 7:13:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Questions](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[TestId] [bigint] NOT NULL,
	[ItemOrder] [int] NOT NULL,
	[Type] [int] NOT NULL,
	[Question] [varbinary](max) NOT NULL,
	[DateCreated] [datetime] NOT NULL CONSTRAINT [DF_TestItems_DateCreated]  DEFAULT (getdate()),
	[Creator] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_TestItems] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[TestResults]    Script Date: 1/26/2019 7:13:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TestResults](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[TestId] [bigint] NOT NULL,
	[Score] [int] NOT NULL,
	[MaxScore] [int] NOT NULL,
	[DateCreated] [datetime] NOT NULL CONSTRAINT [DF_TestResults_DateCreated]  DEFAULT (getdate()),
	[Creator] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_TestResults] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)

GO
ALTER TABLE [dbo].[AnswerOptions]  WITH CHECK ADD  CONSTRAINT [FK_AnswerOptions_Questions] FOREIGN KEY([QuestionId])
REFERENCES [dbo].[Questions] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AnswerOptions] CHECK CONSTRAINT [FK_AnswerOptions_Questions]
GO
ALTER TABLE [dbo].[CourseModules]  WITH CHECK ADD  CONSTRAINT [FK_CourseModules_Cources] FOREIGN KEY([CourseId])
REFERENCES [dbo].[Courses] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[CourseModules] CHECK CONSTRAINT [FK_CourseModules_Cources]
GO
ALTER TABLE [dbo].[ModuleTests]  WITH CHECK ADD  CONSTRAINT [FK_ModuleTests_CourseModules] FOREIGN KEY([ModuleId])
REFERENCES [dbo].[CourseModules] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ModuleTests] CHECK CONSTRAINT [FK_ModuleTests_CourseModules]
GO
ALTER TABLE [dbo].[Questions]  WITH CHECK ADD  CONSTRAINT [FK_TestItems_ModuleTests] FOREIGN KEY([TestId])
REFERENCES [dbo].[ModuleTests] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Questions] CHECK CONSTRAINT [FK_TestItems_ModuleTests]
GO
ALTER TABLE [dbo].[TestResults]  WITH CHECK ADD  CONSTRAINT [FK_TestResults_ModuleTests] FOREIGN KEY([TestId])
REFERENCES [dbo].[ModuleTests] ([Id])
GO
ALTER TABLE [dbo].[TestResults] CHECK CONSTRAINT [FK_TestResults_ModuleTests]
GO
