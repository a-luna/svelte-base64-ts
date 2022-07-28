<script lang="ts">
</script>

<div id="byte-map-demo">
	<div id="hex-b64-mapping" class="binary-chunks data-mapping">
		<div class="input-chunk">
			<div class="chunk-id">
				<span class="chunk-label" style="color: var(--red4);">IN</span>
			</div>
			<div class="chunk-byte" data-bit-group="hex-chunk-1-byte-1" style="outline: 1px dotted var(--teal4);">
				<div class="base64-bit-group" data-bit-group="base64-chunk-1-digit-1" style="color: var(--yellow3);">
					<code class="bit">
						<span>1</span>
					</code>
					<code class="bit">
						<span>2</span>
					</code>
					<code class="bit">
						<span>3</span>
					</code>
					<code class="bit">
						<span>4</span>
					</code>
					<code class="bit">
						<span>5</span>
					</code>
					<code class="bit">
						<span>6</span>
					</code>
				</div>
				<div class="base64-bit-group" data-bit-group="base64-chunk-1-digit-2" style="color: var(--pink4);">
					<code class="bit">
						<span>7</span>
					</code>
					<code class="bit">
						<span>8</span>
					</code>
				</div>
			</div>
			<div class="chunk-byte" data-bit-group="hex-chunk-1-byte-2" style="outline: 1px dotted var(--orange-yellow3);">
				<div class="base64-bit-group" data-bit-group="base64-chunk-1-digit-2" style="color: var(--pink4);">
					<code class="bit">
						<span>9</span>
					</code>
					<code class="bit">
						<span>10</span>
					</code>
					<code class="bit">
						<span>11</span>
					</code>
					<code class="bit">
						<span>12</span>
					</code>
				</div>
				<div class="base64-bit-group" data-bit-group="base64-chunk-1-digit-3" style="color: var(--yellow-green3);">
					<code class="bit">
						<span>13</span>
					</code>
					<code class="bit">
						<span>14</span>
					</code>
					<code class="bit">
						<span>15</span>
					</code>
					<code class="bit">
						<span>16</span>
					</code>
				</div>
			</div>
			<div class="chunk-byte" data-bit-group="hex-chunk-1-byte-3">
				<div class="base64-bit-group" data-bit-group="base64-chunk-1-digit-3">
					<code class="bit">
						<span>17</span>
					</code>
					<code class="bit">
						<span>18</span>
					</code>
				</div>
				<div class="base64-bit-group" data-bit-group="base64-chunk-1-digit-4" style="color: var(--orange3);">
					<code class="bit">
						<span>&nbsp;</span>
					</code>
					<code class="bit">
						<span>&nbsp;</span>
					</code>
					<code class="bit">
						<span>&nbsp;</span>
					</code>
					<code class="bit">
						<span>&nbsp;</span>
					</code>
					<code class="bit">
						<span>&nbsp;</span>
					</code>
					<code class="bit">
						<span>&nbsp;</span>
					</code>
				</div>
			</div>
		</div>
		<div class="output-chunk">
			<div class="chunk-id">
				<span class="chunk-label" style="color: var(--red4);">OUT</span>
			</div>
			<div class="chunk-byte" data-bit-group="base64-chunk-1-digit-1" style="outline: 1px dotted var(--yellow3);">
				<div class="hex-bit-group" data-bit-group="hex-chunk-1-byte-1" style="color: var(--teal4);">
					<code class="bit">
						<span>1</span>
					</code>
					<code class="bit">
						<span>2</span>
					</code>
					<code class="bit">
						<span>3</span>
					</code>
					<code class="bit">
						<span>4</span>
					</code>
					<code class="bit">
						<span>5</span>
					</code>
					<code class="bit">
						<span>6</span>
					</code>
				</div>
			</div>
			<div class="chunk-byte" data-bit-group="base64-chunk-1-digit-2" style="outline: 1px dotted var(--pink4);">
				<div class="hex-bit-group" data-bit-group="hex-chunk-1-byte-1" style="color: var(--teal4);">
					<code class="bit">
						<span>7</span>
					</code>
					<code class="bit">
						<span>8</span>
					</code>
				</div>
				<div class="hex-bit-group" data-bit-group="hex-chunk-1-byte-2" style="color: var(--orange-yellow3);">
					<code class="bit">
						<span>9</span>
					</code>
					<code class="bit">
						<span>10</span>
					</code>
					<code class="bit">
						<span>11</span>
					</code>
					<code class="bit">
						<span>12</span>
					</code>
				</div>
			</div>
			<div class="chunk-byte" data-bit-group="base64-chunk-1-digit-3" style="outline: 1px dotted var(--yellow-green3);">
				<div class="hex-bit-group" data-bit-group="hex-chunk-1-byte-2" style="color: var(--orange-yellow3);">
					<code class="bit">
						<span>13</span>
					</code>
					<code class="bit">
						<span>14</span>
					</code>
					<code class="bit">
						<span>15</span>
					</code>
					<code class="bit">
						<span>16</span>
					</code>
				</div>
				<div class="hex-bit-group" data-bit-group="hex-chunk-1-byte-3" style="color: var(--purple3);">
					<code class="bit">
						<span>17</span>
					</code>
					<code class="bit">
						<span>18</span>
					</code>
				</div>
			</div>
			<div class="chunk-byte" data-bit-group="base64-chunk-1-digit-4" style="outline: 1px dotted var(--white3);">
				<div class="hex-bit-group" data-bit-group="hex-chunk-1-byte-3" style="color: var(--purple3);">
					<code class="bit">
						<span>&nbsp;</span>
					</code>
					<code class="bit">
						<span>&nbsp;</span>
					</code>
					<code class="bit">
						<span>&nbsp;</span>
					</code>
					<code class="bit">
						<span>&nbsp;</span>
					</code>
					<code class="bit">
						<span>&nbsp;</span>
					</code>
					<code class="bit">
						<span>&nbsp;</span>
					</code>
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	#byte-map-demo {
		margin: 0.5rem 0 0 0;
	}
</style>
