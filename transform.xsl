<?xml version="1.0" encoding="windows-1250"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:fo="http://www.w3.org/1999/XSL/Format">
	<xsl:template match="INSTYTUT">
		<html>
			<head>
				<title>Lista pracowników Instytutu Informatyki</title>
			</head>
			<body>
				<h1>
					<xsl:value-of select="@NAZWA"/>
				</h1>
				<h2>
					<xsl:value-of select="@ULICA"/>
				</h2>
				<h2>
					<xsl:value-of select="@KOD"/>
					<xsl:value-of select="@MIASTO"/>
				</h2>
				<xsl:text>Poniżej znajduje się lista zespołów wraz pracownikami każdego zespołu</xsl:text>
				<xsl:apply-templates/>
				<xsl:apply-templates mode="lista_asystentow"/>

			</body>
		</html>
	</xsl:template>
	<xsl:template match="ZESPOL">
		<div class="zespol">
			<xsl:number/>.<xsl:value-of select="NAZWA"/>
			<xsl:choose>
				<xsl:when test="PRACOWNICY">
					<table>
						<xsl:attribute name="BORDER">1</xsl:attribute>
						<tr>
							<th>ID</th><th>NAZWISKO</th><th>ETAT</th><th>PLACA</th>
						</tr>
						<xsl:apply-templates select="PRACOWNICY"/>
					</table>
				</xsl:when>
				<xsl:otherwise>
					<br/><em>Brak pracowników</em>
				</xsl:otherwise>
			</xsl:choose>
		</div>
	</xsl:template>
	<xsl:template match="PRACOWNIK">
		<tr>
			<xsl:if test="ETAT='ASYSTENT'">
				<xsl:attribute name="BGCOLOR">#ADDFFF</xsl:attribute>
			</xsl:if>
			<td><xsl:value-of select="@ID_PRAC"/></td>
			<td><xsl:value-of select="NAZWISKO"/></td>
			<td><xsl:value-of select="ETAT"/></td>
			<td><xsl:value-of select="PLACA"/></td>
		</tr>
	</xsl:template>
	<xsl:template match="ZESPOLY" mode="lista_asystentow">
		<h3>Lista asystentów</h3>
		<ul>
			<xsl:for-each select="//PRACOWNIK">
				<xsl:if test="ETAT='ASYSTENT'">
					<li>
						<xsl:value-of select="NAZWISKO"/>
					</li>
				</xsl:if>
			</xsl:for-each>
		</ul>
	</xsl:template>
</xsl:stylesheet>